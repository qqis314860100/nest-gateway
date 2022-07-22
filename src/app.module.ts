import { CacheModule, Module } from '@nestjs/common';
// nestjs.config默认会从项目根目录载入并解析一个.env文件，从.env文件和process.env合并环境变量键值对，并将结果存储到一个可以通过configService访问的私有结构
import { ConfigModule } from '@nestjs/config'; //dotenv默认解析
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { getConfig } from './utils';

@Module({
  controllers: [AppController],
  providers: [AppService],
  // forRoot 方法注册了 configService 提供者,后者提供了一个get方法来读取这些解析/合并的配置变量
  // 当一个键同时作为环境变量(例如，操作系统终端 export DATABASE_USER=test) 存在运行环境中以及.env文件中时，以运行环境比变量优先

  // dotenv 改成YAML自定义配置文件,禁用默认读取 .env 的规则
  imports: [
    UserModule,
    // 全局配置缓存
    CacheModule.register({ isGlobal: true }),
    ConfigModule.forRoot({
      ignoreEnvFile: true,
      isGlobal: true,
      load: [getConfig],
    }),
  ],
})
export class AppModule {}
