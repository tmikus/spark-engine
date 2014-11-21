var fs = require("fs");
var path = require("path");

var extensionToTypeMap =
{
    ".html": "Text/HTML",
    ".jpg": "Image/JPEG",
    ".js": "Text/JavaScript",
    ".json": "Text/JSON",
    ".png": "Image/PNG"
};

function getResourceEntry(filePath, pathReplacements)
{
    var fileExtension = path.extname(filePath);
    var fileType = extensionToTypeMap[fileExtension.toLowerCase()];

    filePath = filePath.replace(/\\/g, "/");

    var resourceName = filePath.substr(0, filePath.length - fileExtension.length);

    for (var replacementIndex = 0; replacementIndex < pathReplacements.length; replacementIndex++)
    {
        resourceName = resourceName.replace(pathReplacements[replacementIndex].what, pathReplacements[replacementIndex].with);
    }

    return {
        name: resourceName,
        entry:
        {
            path: filePath,
            type: fileType
        }
    };
}

module.exports = function (grunt)
{
    grunt.registerMultiTask("index-resources", "Task used for indexing resources of the game.", function ()
    {
        grunt.log.writeln("Indexing game resources.");

        if (fs.existsSync(this.data.dest))
        {
            fs.unlinkSync(this.data.dest);
        }

        var resources = grunt.file.expand({ cwd: this.data.cwd, filter: 'isFile' }, this.data.src);
        var resourcesMap = {};

        for (var resourceIndex = 0; resourceIndex < resources.length; resourceIndex++)
        {
            var resource = getResourceEntry(resources[resourceIndex], this.data.replacements);
            resourcesMap[resource.name] = resource.entry;
        }

        fs.writeFileSync(this.data.dest, JSON.stringify(resourcesMap), { encoding: "utf8" });

        grunt.log.writeln("Game resources indexed successfully.");
    });
};