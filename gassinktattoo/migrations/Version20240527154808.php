<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20240527154808 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE pedido ADD calle VARCHAR(255) NOT NULL');
        $this->addSql('ALTER TABLE pedido ADD ciudad VARCHAR(255) NOT NULL');
        $this->addSql('ALTER TABLE pedido ADD provincia VARCHAR(255) NOT NULL');
        $this->addSql('ALTER TABLE pedido ADD cp VARCHAR(255) NOT NULL');
        $this->addSql('ALTER TABLE pedido ADD pais VARCHAR(255) NOT NULL');
        $this->addSql('ALTER TABLE pedido ADD numero VARCHAR(255) NOT NULL');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE SCHEMA public');
        $this->addSql('ALTER TABLE pedido DROP calle');
        $this->addSql('ALTER TABLE pedido DROP ciudad');
        $this->addSql('ALTER TABLE pedido DROP provincia');
        $this->addSql('ALTER TABLE pedido DROP cp');
        $this->addSql('ALTER TABLE pedido DROP pais');
        $this->addSql('ALTER TABLE pedido DROP numero');
    }
}
