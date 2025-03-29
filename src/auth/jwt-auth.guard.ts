/* eslint-disable prettier/prettier */
import {
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  canActivate(context: ExecutionContext) {
    return super.canActivate(context);
  }

  handleRequest<TUser = any>(
    err: any,
    user: TUser | null,
    info: { message?: string } | null,
  ): TUser {
    if (err || !user) {
      const errorMessage =
        info?.message === 'jwt expired'
          ? 'Your session has expired. Please log in again'
          : 'Invalid or expired token';

      throw new UnauthorizedException(errorMessage);
    }

    return user;
  }
}
