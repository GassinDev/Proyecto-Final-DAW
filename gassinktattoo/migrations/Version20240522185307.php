<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20240522185307 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE carrito_item ADD producto_id INT DEFAULT NULL');
        $this->addSql('ALTER TABLE carrito_item ADD merchandising_id INT DEFAULT NULL');
        $this->addSql('ALTER TABLE carrito_item ADD size VARCHAR(255) DEFAULT NULL');
        $this->addSql('ALTER TABLE carrito_item ADD quantity INT NOT NULL');
        $this->addSql('ALTER TABLE carrito_item ADD CONSTRAINT FK_3397DFA67645698E FOREIGN KEY (producto_id) REFERENCES producto (id) NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('ALTER TABLE carrito_item ADD CONSTRAINT FK_3397DFA640B83CFE FOREIGN KEY (merchandising_id) REFERENCES merchandising (id) NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('CREATE INDEX IDX_3397DFA67645698E ON carrito_item (producto_id)');
        $this->addSql('CREATE INDEX IDX_3397DFA640B83CFE ON carrito_item (merchandising_id)');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE SCHEMA public');
        $this->addSql('ALTER TABLE carrito_item DROP CONSTRAINT FK_3397DFA67645698E');
        $this->addSql('ALTER TABLE carrito_item DROP CONSTRAINT FK_3397DFA640B83CFE');
        $this->addSql('DROP INDEX IDX_3397DFA67645698E');
        $this->addSql('DROP INDEX IDX_3397DFA640B83CFE');
        $this->addSql('ALTER TABLE carrito_item DROP producto_id');
        $this->addSql('ALTER TABLE carrito_item DROP merchandising_id');
        $this->addSql('ALTER TABLE carrito_item DROP size');
        $this->addSql('ALTER TABLE carrito_item DROP quantity');
    }
}
