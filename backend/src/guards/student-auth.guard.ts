
import {
  Injectable,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { StudentService } from '../modules/student/student.service';

@Injectable()
export class StudentAuthGuard extends AuthGuard('jwt') {
  constructor(private readonly studentService: StudentService) {
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
      throw new UnauthorizedException();
    }

    const student = await this.studentService.getStudentByUserId(user.sub);

    if (!student) {
      throw new UnauthorizedException('You are not a student');
    }

    request.student = student;

    return true;
  }
}
