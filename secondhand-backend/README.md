# iooo-spring-mvc-quickstart

[![Maven Central](https://maven-badges.herokuapp.com/maven-central/tech.iooo.maven.archetypes/iooo-spring-mvc-quickstart-archetype/badge.svg)](https://maven-badges.herokuapp.com/maven-central/tech.iooo.maven.archetypes/iooo-spring-mvc-quickstart-archetype) [![](https://jitpack.io/v/Ivan97/iooo-spring-mvc-quickstart.svg)](https://jitpack.io/#Ivan97/iooo-spring-mvc-quickstart)

- Distribution:

```
<parent>
    <groupId>tech.iooo.coco</groupId>
    <artifactId>iooo-distribution-config</artifactId>
    <version>0.1.2.RELEASE</version>
</parent>
```

- To use:

```
groupId      tech.iooo.maven.archetypes
artifactId   iooo-spring-mvc-quickstart-archetype
version      0.0.1.RELEASE
```

- generate之后清理IDE相关
```
mvn idea:clean
mvn eclipse:clean
```

- archetype-metadata.xml
```xml
<?xml version="1.0" encoding="UTF-8"?>
<archetype-descriptor xsi:schemaLocation="http://maven.apache.org/plugins/maven-archetype-plugin/archetype-descriptor/1.0.0 http://maven.apache.org/xsd/archetype-descriptor-1.0.0.xsd" name="iooo-spring-mvc-quickstart"
    xmlns="http://maven.apache.org/plugins/maven-archetype-plugin/archetype-descriptor/1.0.0"
    xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance">
  <fileSets>
    <fileSet filtered="true" packaged="true" encoding="UTF-8">
      <directory>src/main/java</directory>
      <includes>
        <include>**/*.java</include>
      </includes>
    </fileSet>
    <fileSet filtered="true" encoding="UTF-8">
      <directory>src/main/resources</directory>
      <includes>
        <include>**/*.xml</include>
      </includes>
    </fileSet>
    <fileSet filtered="true" encoding="UTF-8">
      <directory>src/main/webapp</directory>
      <includes>
        <include>**/*.xml</include>
      </includes>
    </fileSet>
    <fileSet encoding="UTF-8">
      <directory></directory>
      <includes>
        <include>LICENSE</include>
        <include>.editorconfig</include>
        <include>README.md</include>
        <include>.gitignore</include>
      </includes>
    </fileSet>
  </fileSets>
</archetype-descriptor>

```

- 删除logs文件夹
