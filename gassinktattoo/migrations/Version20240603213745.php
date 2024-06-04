<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20240603213745 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE SEQUENCE favorito_id_seq INCREMENT BY 1 MINVALUE 1 START 1');
        $this->addSql('CREATE TABLE favorito (id INT NOT NULL, tatuaje_id INT NOT NULL, cliente_id INT NOT NULL, PRIMARY KEY(id))');
        $this->addSql('CREATE INDEX IDX_881067C744A81095 ON favorito (tatuaje_id)');
        $this->addSql('CREATE INDEX IDX_881067C7DE734E51 ON favorito (cliente_id)');
        $this->addSql('ALTER TABLE favorito ADD CONSTRAINT FK_881067C744A81095 FOREIGN KEY (tatuaje_id) REFERENCES tatuaje (id) NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('ALTER TABLE favorito ADD CONSTRAINT FK_881067C7DE734E51 FOREIGN KEY (cliente_id) REFERENCES cliente (id) NOT DEFERRABLE INITIALLY IMMEDIATE');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE SCHEMA public');
        $this->addSql('DROP SEQUENCE favorito_id_seq CASCADE');
        $this->addSql('ALTER TABLE favorito DROP CONSTRAINT FK_881067C744A81095');
        $this->addSql('ALTER TABLE favorito DROP CONSTRAINT FK_881067C7DE734E51');
        $this->addSql('DROP TABLE favorito');
    }
}
