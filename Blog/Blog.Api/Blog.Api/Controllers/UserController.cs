using Blog.Api.Domain.Users.Dto;
using Blog.Api.Domain.Users.Repository;
using Microsoft.AspNetCore.Mvc;

namespace Blog.Api.Controllers;
[Route("api/users")]
[ApiController]
public class UserController : ControllerBase
{
    private readonly IUserRepository _userRepository;
    public UserController(IUserRepository _userRepository)
    {
        this._userRepository = _userRepository;
    }

    [HttpPost]
    public async Task<IActionResult> Create(UserRequest request)
    {
        var user = request.ToEntity();
        var response = await _userRepository.Add(user);
        if(!response)
            return BadRequest();

        var userResponse = UserResponse.ToResponse(user);
        return Ok(userResponse);
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> Update(Guid id, UserRequest request)
    {
        var user = request.ToEntity(id);
        var response = await _userRepository.Update(user);
        if (!response)
            return BadRequest();

        var userResponse = UserResponse.ToResponse(user);
        return Ok(userResponse);
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> Delete(Guid id)
    {
        var response = await _userRepository.Delete(id);
        if (!response)
            return BadRequest();

        return Ok();
    }

    [HttpGet]
    public async Task<IActionResult> Get()
    {
        var users = await _userRepository.GetAll();
        var userResponse = users.Select(UserResponse.ToResponse);
        return Ok(userResponse);
    }

    [HttpGet("{id}")]
    public async Task<IActionResult> Get(Guid id)
    {
        var user = await _userRepository.GetById(id);
        if (user is null)
            return NotFound();

        var userResponse = UserResponse.ToResponse(user);
        return Ok(userResponse);
    }
}
