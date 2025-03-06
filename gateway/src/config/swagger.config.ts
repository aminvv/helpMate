import { INestApplication } from "@nestjs/common";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import { SecuritySchemeObject } from "@nestjs/swagger/dist/interfaces/open-api-spec.interface";

export function swaggerConfigInit(app: INestApplication) {
    const document = new DocumentBuilder()
        .setTitle("Help Mate")
        .setDescription(`
        HelpChat is a backend system designed with NestJS and RabbitMQ to manage user authentication, notifications, and messaging.
        Users can register using email or phone number with OTP verification. 
        The system follows Event-Driven Architecture to send notifications asynchronously.`)
        .setVersion('v0.0.1')
        .addBearerAuth(swaggerAuthConfig(),"authorization")
        .build()
        const swaggerDocument=SwaggerModule.createDocument(app,document)
        SwaggerModule.setup('/swagger',app,swaggerDocument)
}


function  swaggerAuthConfig():SecuritySchemeObject{
    return{
        type:"http",
        bearerFormat:"JWT",
        in:"header",
        scheme:"bearer"
    }
    }
