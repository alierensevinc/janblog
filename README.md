# janblog
Spring Boot &amp; Angular Project

Before you run Spring Boot app you have to create a application.properties and janblog.jks files in backend/src/main/resources 

application.properties : 

spring.datasource.url=jdbc:mysql://localhost/janblog

spring.datasource.username=<username>
  
spring.datasource.password=<password>
  
spring.datasource.driver-class-name=com.mysql.cj.jdbc.Driver


spring.jpa.hibernate.ddl-auto=create

spring.jpa.show-sql=true





After your first run, you can change spring.jpa.hibernate.ddl-auto value from create to update

And to create a jks file you can run :

keytool -genkey -alias janblog -keyalg RSA -keystore janblog.jks -keysize 2048

keytool -importkeystore -srckeystore janblog.jks -destkeystore janblog.jks -deststoretype pkcs12   

Also you can import janBlog.postman_collection.json file to Postman for using services.
