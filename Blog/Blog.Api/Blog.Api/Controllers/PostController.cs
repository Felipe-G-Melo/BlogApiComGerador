using Blog.Api.Domain.Posts.Dto;
using Blog.Api.Domain.Posts.Repository;
using Microsoft.AspNetCore.Mvc;

namespace Blog.Api.Controllers;
[Route("api/posts")]
[ApiController]
public class PostController : ControllerBase
{
    private readonly IPostRepository _postRepository;
    public PostController(IPostRepository _postRepository)
    {
        this._postRepository = _postRepository;
    }

    [HttpPost]
    public async Task<IActionResult> Create(PostRequest request)
    {
        var post = request.ToEntity();
        var response = await _postRepository.Add(post);
        if(!response)
            return BadRequest();

        var postResponse = PostResponse.ToResponse(post);
        return Ok(postResponse);
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> Update(Guid id, PostRequest request)
    {
        var post = request.ToEntity(id);
        var response = await _postRepository.Update(post);
        if (!response)
            return BadRequest();

        var postResponse = PostResponse.ToResponse(post);
        return Ok(postResponse);
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> Delete(Guid id)
    {
        var response = await _postRepository.Delete(id);
        if (!response)
            return BadRequest();

        return Ok();
    }

    [HttpGet]
    public async Task<IActionResult> Get()
    {
        var posts = await _postRepository.GetAll();
        var postResponse = posts.Select(PostResponse.ToResponse);
        return Ok(postResponse);
    }

    [HttpGet("{id}")]
    public async Task<IActionResult> Get(Guid id)
    {
        var post = await _postRepository.GetById(id);
        if (post is null)
            return NotFound();

        var postResponse = PostResponse.ToResponse(post);
        return Ok(postResponse);
    }
}
