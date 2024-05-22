<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20240522205146 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE SEQUENCE carrito_id_seq INCREMENT BY 1 MINVALUE 1 START 1');
        $this->addSql('CREATE SEQUENCE carrito_item_id_seq INCREMENT BY 1 MINVALUE 1 START 1');
        $this->addSql('CREATE TABLE carrito (id INT NOT NULL, cliente_id INT NOT NULL, PRIMARY KEY(id))');
        $this->addSql('CREATE UNIQUE INDEX UNIQ_77E6BED5DE734E51 ON carrito (cliente_id)');
        $this->addSql('CREATE TABLE carrito_item (id INT NOT NULL, carrito_id INT NOT NULL, producto_id INT DEFAULT NULL, merchandising_id INT DEFAULT NULL, quantity INT NOT NULL, PRIMARY KEY(id))');
        $this->addSql('CREATE INDEX IDX_3397DFA6DE2CF6E7 ON carrito_item (carrito_id)');
        $this->addSql('CREATE INDEX IDX_3397DFA67645698E ON carrito_item (producto_id)');
        $this->addSql('CREATE INDEX IDX_3397DFA640B83CFE ON carrito_item (merchandising_id)');
        $this->addSql('ALTER TABLE carrito ADD CONSTRAINT FK_77E6BED5DE734E51 FOREIGN KEY (cliente_id) REFERENCES cliente (id) NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('ALTER TABLE carrito_item ADD CONSTRAINT FK_3397DFA6DE2CF6E7 FOREIGN KEY (carrito_id) REFERENCES carrito (id) NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('ALTER TABLE carrito_item ADD CONSTRAINT FK_3397DFA67645698E FOREIGN KEY (producto_id) REFERENCES producto (id) NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('ALTER TABLE carrito_item ADD CONSTRAINT FK_3397DFA640B83CFE FOREIGN KEY (merchandising_id) REFERENCES merchandising (id) NOT DEFERRABLE INITIALLY IMMEDIATE');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE SCHEMA public');
        $this->addSql('DROP SEQUENCE carrito_id_seq CASCADE');
        $this->addSql('DROP SEQUENCE carrito_item_id_seq CASCADE');
        $this->addSql('ALTER TABLE carrito DROP CONSTRAINT FK_77E6BED5DE734E51');
        $this->addSql('ALTER TABLE carrito_item DROP CONSTRAINT FK_3397DFA6DE2CF6E7');
        $this->addSql('ALTER TABLE carrito_item DROP CONSTRAINT FK_3397DFA67645698E');
        $this->addSql('ALTER TABLE carrito_item DROP CONSTRAINT FK_3397DFA640B83CFE');
        $this->addSql('DROP TABLE carrito');
        $this->addSql('DROP TABLE carrito_item');
    }
}
