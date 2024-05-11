import mongoose from 'mongoose';
import { asMiddleware } from '@loopback/rest'; // Import asMiddleware
import { ApplicationConfig, MainApplication } from './application';
import { createBindingFromClass } from '@loopback/core';
import { Configs } from './constants';
export * from './application';
import { JobService, jobService } from './services/job.service';

export async function main(options: ApplicationConfig = {}) {
    const app = new MainApplication(options);
    // Đăng ký middleware trong ứng dụng
    // app.add(createBindingFromClass(Router));
    await app.boot();
    await app.start();

    const url = app.restServer.url?.replace('[::1]', 'localhost');

    // connect to mongoDb
    mongoose.connect(Configs.DATABASE);
    mongoose.Promise = global.Promise;
    jobService.init();

    console.log(`Server is running at ${url}`);
    return app;
}

if (require.main === module) {
    // Run the application
    const config = {
        rest: {
            port: +(process.env.PORT ?? 3000),
            host: process.env.HOST,
            // The `gracePeriodForClose` provides a graceful close for http/https
            // servers with keep-alive clients. The default value is `Infinity`
            // (don't force-close). If you want to immediately destroy all sockets
            // upon stop, set its value to `0`.
            // See https://www.npmjs.com/package/stoppable
            gracePeriodForClose: 5000, // 5 seconds
            openApiSpec: {
                // useful when used with OpenAPI-to-GraphQL to locate your application
                setServersFromRequest: true,
            },
        },
    };
    main(config).catch((err) => {
        console.error('Cannot start the application.', err);
        process.exit(1);
    });
}
