import { Helper } from '../helper/index.js';

export class Models {
  constructor(
    entityName,
    entityProperties,
    requestProperties,
    responseProperties
  ) {
    this.entityName = entityName;
    this.entityProperties = entityProperties;
    this.requestProperties = requestProperties;
    this.responseProperties = responseProperties;
    this.helper = new Helper();
    this.entityNameInCamelCase = this.helper.toCamelCase(entityName);
  }

  get entity() {
    return `using Blog.Api.Abstractions;

namespace Blog.Api.Domain.${this.entityName}s.Entity;

public class ${this.entityName}Entity : BaseEntity<${this.entityName}Entity>
{
    ${this.helper.buildProperties(this.entityProperties).join('\n    ')}
}
`;
  }

  get interfaceRepository() {
    return `using Blog.Api.Abstractions;
using Blog.Api.Domain.${this.entityName}s.Entity;

namespace Blog.Api.Domain.${this.entityName}s.Repository;

public interface I${this.entityName}Repository : IRepository<${this.entityName}Entity>
{
}
`;
  }

  get repository() {
    return `using Blog.Api.Abstractions;
using Blog.Api.Domain.${this.entityName}s.Entity;

namespace Blog.Api.Domain.${this.entityName}s.Repository;

public class ${this.entityName}Repository
    : Repository<${this.entityName}Entity>, I${this.entityName}Repository
{
}
`;
  }

  get dtoRequest() {
    return `using Blog.Api.Domain.${this.entityName}s.Entity;

namespace Blog.Api.Domain.${this.entityName}s.Dto;

public class ${this.entityName}Request
{
    ${this.helper.buildProperties(this.requestProperties).join('\n    ')}

    public ${this.entityName}Entity ToEntity(Guid? id = null)
        => new()
        {
            Id = id ?? Guid.NewGuid(),
            ${this.helper.buildPropertiesEqual(this.requestProperties).join(',\n            ')}
        };
}
`;
  }
  
  get dtoResponse() {
    return `using Blog.Api.Domain.${this.entityName}s.Entity;

namespace Blog.Api.Domain.${this.entityName}s.Dto;

public class ${this.entityName}Response
{
    public Guid? Id { get; init; }
    ${this.helper.buildProperties(this.responseProperties).join('\n    ')}

    public static ${this.entityName}Response ToResponse(${this.entityName}Entity ${this.entityNameInCamelCase})
        => new()
        {
            Id = ${this.entityNameInCamelCase}.Id,
            ${this.helper.buildPropertiesEqual(this.responseProperties, true, this.entityNameInCamelCase).join(',\n            ')}
        };
}
`;
  }

  get controller() {
    const name = this.helper.replacePascalCase(this.entityName);
    return `using Blog.Api.Domain.${this.entityName}s.Dto;
using Blog.Api.Domain.${this.entityName}s.Repository;
using Microsoft.AspNetCore.Mvc;

namespace Blog.Api.Controllers;
[Route("api/${name.replace(' ', '-')}s")]
[ApiController]
public class ${this.entityName}Controller : ControllerBase
{
    private readonly I${this.entityName}Repository _${this.entityNameInCamelCase}Repository;
    public ${this.entityName}Controller(I${this.entityName}Repository _${this.entityNameInCamelCase}Repository)
    {
        this._${this.entityNameInCamelCase}Repository = _${this.entityNameInCamelCase}Repository;
    }

    [HttpPost]
    public async Task<IActionResult> Create(${this.entityName}Request request)
    {
        var ${this.entityNameInCamelCase} = request.ToEntity();
        var response = await _${this.entityNameInCamelCase}Repository.Add(${this.entityNameInCamelCase});
        if(!response)
            return BadRequest();

        var ${this.entityNameInCamelCase}Response = ${this.entityName}Response.ToResponse(${this.entityNameInCamelCase});
        return Ok(${this.entityNameInCamelCase}Response);
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> Update(Guid id, ${this.entityName}Request request)
    {
        var ${this.entityNameInCamelCase} = request.ToEntity(id);
        var response = await _${this.entityNameInCamelCase}Repository.Update(${this.entityNameInCamelCase});
        if (!response)
            return BadRequest();

        var ${this.entityNameInCamelCase}Response = ${this.entityName}Response.ToResponse(${this.entityNameInCamelCase});
        return Ok(${this.entityNameInCamelCase}Response);
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> Delete(Guid id)
    {
        var response = await _${this.entityNameInCamelCase}Repository.Delete(id);
        if (!response)
            return BadRequest();

        return Ok();
    }

    [HttpGet]
    public async Task<IActionResult> Get()
    {
        var ${this.entityNameInCamelCase}s = await _${this.entityNameInCamelCase}Repository.GetAll();
        var ${this.entityNameInCamelCase}Response = ${this.entityNameInCamelCase}s.Select(${this.entityName}Response.ToResponse);
        return Ok(${this.entityNameInCamelCase}Response);
    }

    [HttpGet("{id}")]
    public async Task<IActionResult> Get(Guid id)
    {
        var ${this.entityNameInCamelCase} = await _${this.entityNameInCamelCase}Repository.GetById(id);
        if (${this.entityNameInCamelCase} is null)
            return NotFound();

        var ${this.entityNameInCamelCase}Response = ${this.entityName}Response.ToResponse(${this.entityNameInCamelCase});
        return Ok(${this.entityNameInCamelCase}Response);
    }
}
`;
  }
}
