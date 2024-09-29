import Generator from 'yeoman-generator';
import { Models } from '../models/index.js';

export default class extends Generator {
  async prompting() {
    this.entity = await this.prompt([
      {
        type: 'input',
        name: 'name',
        message: 'Qual o nome da entidade? (ex: User, UserProfile)',
      },
    ]);

    let loop = true;
    this.entityProperties = [];
    this.log('\nAdicione os campos da entidade');
    while (loop) {
      const field = await this.prompt([
        {
          type: 'input',
          name: 'name',
          message: 'Qual o nome do campo? (ex: Name, Email)',
        },
        {
          type: 'list',
          name: 'type',
          message: 'Qual o tipo do campo?',
          choices: ['string', 'int', 'bool', 'DateTime', 'Guid'],
        },
        {
          type: 'confirm',
          name: 'addAnother',
          message: 'Deseja adicionar outro campo?',
        },
      ]);

      this.entityProperties.push({
        name: field.name,
        type: field.type,
      });

      if (!field.addAnother) {
        loop = false;
      }
    }

    this.log('\nEscolha os campos que estarão no request');
    this.requestProperties = [];
    for (let i = 0; i < this.entityProperties.length; i++) {
      const field = await this.prompt([
        {
          type: 'confirm',
          name: 'addAnother',
          message: `O campo '${this.entityProperties[i].name}' vai estar no request? `,
        },
      ]);

      if (field.addAnother) {
        this.requestProperties.push(this.entityProperties[i]);
      }
    }

    this.log('\nEscolha os campos que estarão no response');
    this.responseProperties = [];
    for (let i = 0; i < this.entityProperties.length; i++) {
      const field = await this.prompt([
        {
          type: 'confirm',
          name: 'addAnother',
          message: `O campo '${this.entityProperties[i].name}' vai estar no response? `,
        },
      ]);

      if (field.addAnother) {
        this.responseProperties.push(this.entityProperties[i]);
      }
    }
  }

  writing() {
    this.log('Generating files...');
    const models = new Models(
      this.entity.name,
      this.entityProperties,
      this.requestProperties,
      this.responseProperties
    );

    const domainPath = `./Blog.Api/Domain/${this.entity.name}s`;
    this.fs.write(`${domainPath}/Entity/${this.entity.name}Entity.cs`, models.entity);
    this.fs.write(`${domainPath}/Repository/I${this.entity.name}Repository.cs`, models.interfaceRepository);
    this.fs.write(`${domainPath}/Repository/${this.entity.name}Repository.cs`, models.repository);
    this.fs.write(`${domainPath}/Dto/${this.entity.name}Request.cs`, models.dtoRequest);
    this.fs.write(`${domainPath}/Dto/${this.entity.name}Response.cs`, models.dtoResponse);

    const controllerPath = `./Blog.Api/Controllers`;
    this.fs.write(`${controllerPath}/${this.entity.name}Controller.cs`, models.controller);

    let programFile = this.fs.read(`./Blog.Api/Program.cs`);
    programFile = programFile.replace(
      'builder.Services.AddControllers();',
      `builder.Services.AddSingleton<I${this.entity.name}Repository, ${this.entity.name}Repository>();\nbuilder.Services.AddControllers();`
    );
    
    programFile = `using Blog.Api.Domain.${this.entity.name}s.Repository;\n` + programFile;

    this.fs.write(`./Blog.Api/Program.cs`, programFile);
  }
}
