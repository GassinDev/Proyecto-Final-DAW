<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20240602001600 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE SEQUENCE cita_id_seq INCREMENT BY 1 MINVALUE 1 START 1');
        $this->addSql('CREATE TABLE cita (id INT NOT NULL, cliente_id INT DEFAULT NULL, tatuaje_id INT DEFAULT NULL, date TIMESTAMP(0) WITHOUT TIME ZONE NOT NULL, worker_name VARCHAR(255) NOT NULL, state BOOLEAN NOT NULL, PRIMARY KEY(id))');
        $this->addSql('CREATE INDEX IDX_3E379A62DE734E51 ON cita (cliente_id)');
        $this->addSql('CREATE INDEX IDX_3E379A6244A81095 ON cita (tatuaje_id)');
        $this->addSql('ALTER TABLE cita ADD CONSTRAINT FK_3E379A62DE734E51 FOREIGN KEY (cliente_id) REFERENCES cliente (id) NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('ALTER TABLE cita ADD CONSTRAINT FK_3E379A6244A81095 FOREIGN KEY (tatuaje_id) REFERENCES tatuaje (id) NOT DEFERRABLE INITIALLY IMMEDIATE');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE SCHEMA public');
        $this->addSql('DROP SEQUENCE cita_id_seq CASCADE');
        $this->addSql('ALTER TABLE cita DROP CONSTRAINT FK_3E379A62DE734E51');
        $this->addSql('ALTER TABLE cita DROP CONSTRAINT FK_3E379A6244A81095');
        $this->addSql('DROP TABLE cita');
    }
}
