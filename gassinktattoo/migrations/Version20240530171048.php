<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20240530171048 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE pedido DROP CONSTRAINT fk_c4ec16cede734e51');
        $this->addSql('DROP INDEX idx_c4ec16cede734e51');
        $this->addSql('ALTER TABLE pedido DROP cliente_id');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE SCHEMA public');
        $this->addSql('ALTER TABLE pedido ADD cliente_id INT NOT NULL');
        $this->addSql('ALTER TABLE pedido ADD CONSTRAINT fk_c4ec16cede734e51 FOREIGN KEY (cliente_id) REFERENCES cliente (id) NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('CREATE INDEX idx_c4ec16cede734e51 ON pedido (cliente_id)');
    }
}
