import {
  AuthenticationRegistry,
  SessionCookieProvider,
  SessionRecord,
} from '@nestjs/authentication';
import { Injectable } from '@nestjs/common';
import { User } from '@users/interfaces/user.interface.js';
import { UserRepository } from '@users/repository/users.repository.js';

@Injectable()
export class SessionAuthService extends SessionCookieProvider<User> {
  constructor(
    private readonly userRepository: UserRepository,
    registry: AuthenticationRegistry,
  ) {
    super();
    registry.registerProvider(this);
  }

  protected async validate(session: SessionRecord) {
    const user = await this.userRepository.findById(Number(session.userId));

    if (!user || !user.isActive) {
      return null;
    }

    return user;
  }
}
