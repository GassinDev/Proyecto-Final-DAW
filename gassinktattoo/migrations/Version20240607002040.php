<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20240607002040 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE cita ADD cliente_id INT NOT NULL');
        $this->addSql('ALTER TABLE cita ADD worker_id INT NOT NULL');
        $this->addSql('ALTER TABLE cita ADD CONSTRAINT FK_3E379A62DE734E51 FOREIGN KEY (cliente_id) REFERENCES cliente (id) NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('ALTER TABLE cita ADD CONSTRAINT FK_3E379A626B20BA36 FOREIGN KEY (worker_id) REFERENCES cliente (id) NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('CREATE INDEX IDX_3E379A62DE734E51 ON cita (cliente_id)');
        $this->addSql('CREATE INDEX IDX_3E379A626B20BA36 ON cita (worker_id)');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE SCHEMA public');
        $this->addSql('ALTER TABLE cita DROP CONSTRAINT FK_3E379A62DE734E51');
        $this->addSql('ALTER TABLE cita DROP CONSTRAINT FK_3E379A626B20BA36');
        $this->addSql('DROP INDEX IDX_3E379A62DE734E51');
        $this->addSql('DROP INDEX IDX_3E379A626B20BA36');
        $this->addSql('ALTER TABLE cita DROP cliente_id');
        $this->addSql('ALTER TABLE cita DROP worker_id');
    }
}
