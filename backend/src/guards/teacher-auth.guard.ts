import {
  Injectable,
  ExecutionContext,
  UnauthorizedException,
  Logger,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { TeacherService } from '../modules/teacher/teacher.service';

@Injectable()
export class TeacherAuthGuard extends AuthGuard('jwt') {
  private readonly logger = new Logger(TeacherAuthGuard.name);

  constructor(private readonly teacherService: TeacherService) {
    super();
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const parentCanActivate = (await super.canActivate(context)) as boolean;
    if (!parentCanActivate) {
      return false;
    }

    const request = context.switchToHttp().getRequest();
    const user = request.user;

    if (!user || !user.sub) {
      this.logger.warn('No user or user.sub found in request');
      throw new UnauthorizedException();
    }
    //this.logger.log(user)
    //this.logger.log(`Checking teacher for userId: ${user.sub}`);
    const teacher = await this.teacherService.getTeacherByUserId(user.sub);

    if (!teacher) {
      //this.logger.warn(`No teacher found for userId: ${user.sub}`);
      throw new UnauthorizedException('You are not a teacher');
    }

    this.logger.log(`Teacher found: ${teacher.id}`);
    request.teacher = teacher;

    return true;
  }
}
