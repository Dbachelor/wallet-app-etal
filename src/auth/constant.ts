import { ConfigService } from "@nestjs/config";

export const jwtConstants = {
  secret: 'DO NOT USE THIS VALUE. INSTEAD, CREATE A COMPLEX SECRET AND KEEP IT SAFE OUTSIDE OF THE SOURCE CODE.',
};

export class ConfigSecret{

    config(configService:ConfigService):string{
        return configService.get<string>('SECRET');
    }
}