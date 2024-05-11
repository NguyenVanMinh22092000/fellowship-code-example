import path from 'path';
import multer from 'multer';
import { Router } from './middlewares';
import { MainSequence } from './sequence';
import { BootMixin } from '@loopback/boot';
import { RestApplication } from '@loopback/rest';
import { RepositoryMixin } from '@loopback/repository';
import { ServiceMixin } from '@loopback/service-proxy';
import { FILE_UPLOAD_SERVICE, STORAGE_DIRECTORY } from './keys';
import { ApplicationConfig, createBindingFromClass } from '@loopback/core';
import { RestExplorerBindings, RestExplorerComponent } from '@loopback/rest-explorer';
export { ApplicationConfig };
export class MainApplication extends BootMixin(ServiceMixin(RepositoryMixin(RestApplication))) {
    constructor(options: ApplicationConfig = {}) {
        super(options);

        this.add(createBindingFromClass(Router));
        // Set up the custom sequence
        this.sequence(MainSequence);
        // Set up defaut home page
        this.static('/', path.join(__dirname, '../public'));

        // Customize @loopback/rest-explorer configuration here
        this.configure(RestExplorerBindings.COMPONENT).to({
            path: '/explorer',
        });
        this.component(RestExplorerComponent);

        // Configure file upload with multer options
        this.configureFileUpload(options.fileStorageDirectory);
        this.projectRoot = __dirname;
        // Customize @loopback/boot Booter Conventions here
        this.bootOptions = {
            controllers: {
                // Customize ControllerBooter Conventions here
                dirs: ['controllers'],
                extensions: ['.controller.js'],
                nested: true,
            },
        };
    }
    /**
     * Configure `multer` options for file upload
     */
    protected configureFileUpload(destination?: string) {
        destination = destination ?? path.join(__dirname, '../.upload');
        this.bind(STORAGE_DIRECTORY).to(destination);
        let fileName = +new Date();
        const multerOptions: multer.Options = {
            storage: multer.diskStorage({
                destination,
                filename: (req, file, cb) => {
                    const finalFileName = fileName + '-' + file.originalname;
                    cb(null, finalFileName);
                },
            }),
        };
        this.configure(FILE_UPLOAD_SERVICE).to(multerOptions);
    }
}
