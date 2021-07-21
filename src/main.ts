import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as session from 'express-session';
import * as passport from 'passport';
import { LocalStrategy } from './auth/local.strategy';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(
    session({
      secret: 's3cret!', // var env!!
      resave: false,
      saveUninitialized: false,
      cookie: { maxAge: 1 * 24 * 60 * 60, httpOnly: true },
    }),
  );
  app.use(passport.initialize());
  app.use(passport.session());
  await app.listen(3000);
}
bootstrap();
