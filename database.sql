/*
 * Copyright (c) 2020 - cadox8
 *
 * All Rights Reserved
 *
 * That means:
 *
 * - You shall not use any piece of this software in a commercial product / service
 * - You shall not resell this software
 * - You shall not provide any facility to install this particular software in a commercial product / service
 * - If you redistribute this software, you must link to ORIGINAL repository at https://github.com/cadox8/besx
 * - This copyright should appear in every part of the project code
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */

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