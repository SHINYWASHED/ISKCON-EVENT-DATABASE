using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.AspNetCore.Http;
using System.IO;

var builder = WebApplication.CreateBuilder(args);
builder.Services.AddControllers();
builder.Services.AddDirectoryBrowser();

var app = builder.Build();

app.UseStaticFiles(); // Serve static files (HTML, CSS, JS, images)
app.UseRouting();

// Serve Gallery Page
app.MapGet("/gallery", async context =>
{
    await context.Response.SendFileAsync("wwwroot/gallery.html");
});

// Allow Image Upload (Admin Only)
app.MapPost("/upload", async context =>
{
    if (!context.Request.HasFormContentType)
    {
        context.Response.StatusCode = 400;
        await context.Response.WriteAsync("Invalid Request");
        return;
    }

    var form = await context.Request.ReadFormAsync();
    var file = form.Files["image"];

    if (file == null || file.Length == 0)
    {
        context.Response.StatusCode = 400;
        await context.Response.WriteAsync("No file uploaded");
        return;
    }

    var filePath = Path.Combine("wwwroot/gallery", file.FileName);
    using var stream = new FileStream(filePath, FileMode.Create);
    await file.CopyToAsync(stream);

    await context.Response.WriteAsync("File uploaded successfully!");
});

app.Run();
