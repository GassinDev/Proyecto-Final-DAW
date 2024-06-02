<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20240602165032 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE SEQUENCE peticion_cita_id_seq INCREMENT BY 1 MINVALUE 1 START 1');
        $this->addSql('CREATE TABLE peticion_cita (id INT NOT NULL, cliente_id INT DEFAULT NULL, tatuaje_id INT NOT NULL, fecha_hora_cita TIMESTAMP(0) WITHOUT TIME ZONE NOT NULL, description VARCHAR(500) NOT NULL, is_acepted BOOLEAN NOT NULL, PRIMARY KEY(id))');
        $this->addSql('CREATE INDEX IDX_26026666DE734E51 ON peticion_cita (cliente_id)');
        $this->addSql('CREATE INDEX IDX_2602666644A81095 ON peticion_cita (tatuaje_id)');
        $this->addSql('ALTER TABLE peticion_cita ADD CONSTRAINT FK_26026666DE734E51 FOREIGN KEY (cliente_id) REFERENCES cliente (id) NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('ALTER TABLE peticion_cita ADD CONSTRAINT FK_2602666644A81095 FOREIGN KEY (tatuaje_id) REFERENCES tatuaje (id) NOT DEFERRABLE INITIALLY IMMEDIATE');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE SCHEMA public');
        $this->addSql('DROP SEQUENCE peticion_cita_id_seq CASCADE');
        $this->addSql('ALTER TABLE peticion_cita DROP CONSTRAINT FK_26026666DE734E51');
        $this->addSql('ALTER TABLE peticion_cita DROP CONSTRAINT FK_2602666644A81095');
        $this->addSql('DROP TABLE peticion_cita');
    }
}
