export class Helper {
  buildProperties(properties) {
    return properties.map((property) => {
      if (property.type === 'string') {
        return `public ${property.type} ${property.name} { get; init; } = string.Empty;`;
      }
      return `public ${property.type} ${property.name} { get; init; }`;
    });
  }

  buildPropertiesEqual(properties, isResponse = false, name = '') {
    return properties.map((property) => {
        if (isResponse) {
          return `${property.name} = ${name}.${property.name}`;
        }
        return `${property.name} = ${property.name}`;
    });
  }

  replacePascalCase(str) {
    let result = str.charAt(0).toLowerCase();
    
    for (let i = 1; i < str.length; i++) {
        if (str[i] === str[i].toUpperCase()) {
            result += ' ' + str[i].toLowerCase();
        } else {
            result += str[i];
        }
    }
    
    return result;
 }

  toCamelCase(name) {
    return name.charAt(0).toLowerCase() + name.slice(1);
  }
}
