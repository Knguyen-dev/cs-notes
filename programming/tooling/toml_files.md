# Toml Files 
TOML (Tom's Obvious Minimal Language) is a data serialization language designed to be a minimalistic/readable config file format. It's an iterative to other config file formats like YAML or JSON as it's designed to be more human-friendly and simpler. 

## TOML maps unambiguously to a hash table
This means the structure of a TOML file directly translates int oa key-value format, which is also the core idea behind hash tables.
- **Keys** in TOML (e.g., title = "Hello") directly correspond to keys in a hash table.
- **Values** (e.g., numbers, strings, booleans) map cleanly as values in the hash table.
- **Tables (sections)** in TOML ([database]) become nested hash tables (dictionaries, objects, etc.).

For example, this TOML file:
```toml
[database]
host = "localhost"
port = 5432
```
Can be represented by this json object:
```json
{
  "database": {
    "host": "localhost",
    "port": 5432
  }
}
```
No ambiguity or complex parsing, but just simple mapping. There are a couple of reason why this is important includes:
- **Easy parsing:** Many programming languages should be able to parse TOML files with minimal effort.
- **Readable/predictable:** Very easy to visualize and understand the structure of a TOML and what you're actually writing in JSON object form.

However a disadvantage is that you may see this file as less concise.

## When do I use them? Explaining `pyproject.toml`
TOML is great for defining app settings, environment variables, and dependencies. A popular Rust package manager called "Cargo" uses a toml file for containing project dependencies and build settings.

For example `pyproject.toml` is a configuration file for Python projects. The main goal is to provide a single place to configure:
- **Build System:** How your project should be packaged and built (superseding older files like `setup.py` and `setup.cfg`).
- **Project Metadata:** Basic information about your package (name, version, authors, dependencies, etc.)
- **Tool Configurations:** Settings for various Python development tools (linters, formatters, test runners, etc.)

The file is structured using tables (sections) enclosed in square brackets. While many tools can add their own tables, the three fundamental ones are:
- `[build-system]`: Defines the tools needed to build the package. It specifies the build backend (e.g. `setuptools`, `poetry`, etc.) and the dependencies required before the project can be built.
- `[project]`: Specifies the package's core metadata. this includes the package name, version, description, license, dependencies (required and developer), etc. 
- `[tool]`: A namespace for all other development tools. Any tool that needs configuration (e.g. `black`, `ruff`, `pytest`) would place its settings under `[tool.<toolname>]`.

Below we have an example:
```TOML
[build-system]
requires = ["hatchling"]
build-backend = "hatchling.build"

[project]
name = "my-awesome-package"
version = "0.1.0"
description = "A really useful Python package."
authors = [
    {name = "Jane Doe", email = "jane@example.com"}
]
dependencies = [
    "requests",
    "numpy>=1.20.0"
]

[tool.black] # Configuration for the 'black' code formatter
line-length = 88
target-version = ['py310']

[tool.pytest.ini_options] # Configuration for the 'pytest' test runner
addopts = "--strict-markers"
```
## Credits 
- [Toml Files](https://learnxinyminutes.com/toml/#:~:text=TOML%20stands%20for%20Tom)
- [What is pyproject.toml? ](https://packaging.python.org/en/latest/guides/writing-pyproject-toml/)