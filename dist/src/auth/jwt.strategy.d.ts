import { Strategy } from 'passport-jwt';
import { User } from './user.entity';
import { UsersRepository } from './users.repository';
import { JwtPayload } from './jwt-payload.interface';
import { ConfigService } from '@nestjs/config';
declare const JwtStrategy_base: new (...args: any[]) => Strategy;
export declare class JwtStrategy extends JwtStrategy_base {
    private usersRepository;
    private configService;
    constructor(usersRepository: UsersRepository, configService: ConfigService);
    validate(jwtPayload: JwtPayload): Promise<User>;
}
export {};
