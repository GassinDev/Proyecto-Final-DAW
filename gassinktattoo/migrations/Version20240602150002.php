<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20240602150002 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE cita DROP CONSTRAINT fk_3e379a62de734e51');
        $this->addSql('DROP INDEX idx_3e379a62de734e51');
        $this->addSql('ALTER TABLE cita ADD cliente_username VARCHAR(255) NOT NULL');
        $this->addSql('ALTER TABLE cita DROP cliente_id');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE SCHEMA public');
        $this->addSql('ALTER TABLE cita ADD cliente_id INT DEFAULT NULL');
        $this->addSql('ALTER TABLE cita DROP cliente_username');
        $this->addSql('ALTER TABLE cita ADD CONSTRAINT fk_3e379a62de734e51 FOREIGN KEY (cliente_id) REFERENCES cliente (id) NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('CREATE INDEX idx_3e379a62de734e51 ON cita (cliente_id)');
    }
}
