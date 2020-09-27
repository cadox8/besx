create database if not exists besx;

use besx;

create table if not exists userdata (
    id              INTEGER(255) UNSIGNED NOT NULL AUTO_INCREMENT,
    steam           VARCHAR(255) NOT NULL,
    discord         VARCHAR(255) NOT NULL,

    money           DOUBLE(2, 255) NOT NULL DEFAULT 0,
    bank            DOUBLE(2, 255) NOT NULL DEFAULT 0,
    blackMoney      DOUBLE(2, 255) NOT NULL DEFAULT 0,

    job             INTEGER(10) NOT NULL DEFAULT 0,
    employer        integer(10) not null default 0,

    `rank`          INTEGER(10) NOT NULL DEFAULT 0,
    PRIMARY KEY (id)
) ENGINE = InnoDB DEFAULT CHARSET = utf8;

create table if not exists job (
    id              integer(255) UNSIGNED NOT NULL AUTO_INCREMENT,
    name            varchar(255) not null default 'Undefined',
    primary key (id)
) ENGINE = InnoDB DEFAULT CHARSET = utf8;

create table if not exists jobs (
    id              integer(255) unsigned not null auto_increment,
    job             integer(255) not null default 0,
    name            varchar(255) not null default 'Undefined',
    salary          double(2, 255) not null default 0,
    boss            integer(1) not null default 0,
    primary key (id),
    foreign key (job) REFERENCES job(id)
) ENGINE = InnoDB DEFAULT CHARSET = utf8;

insert into job (name) VALUE ('Unemployed');
insert into jobs (job, name, salary) VALUE (0, 'Unemployed', 50);