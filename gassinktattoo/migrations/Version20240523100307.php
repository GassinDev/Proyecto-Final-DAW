<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20240523100307 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE SEQUENCE carrito_id_seq INCREMENT BY 1 MINVALUE 1 START 1');
        $this->addSql('CREATE TABLE carrito (id INT NOT NULL, cliente_id INT NOT NULL, producto_id INT DEFAULT NULL, merchandising_id INT DEFAULT NULL, size VARCHAR(255) DEFAULT NULL, quantity INT NOT NULL, PRIMARY KEY(id))');
        $this->addSql('CREATE INDEX IDX_77E6BED5DE734E51 ON carrito (cliente_id)');
        $this->addSql('CREATE INDEX IDX_77E6BED57645698E ON carrito (producto_id)');
        $this->addSql('CREATE INDEX IDX_77E6BED540B83CFE ON carrito (merchandising_id)');
        $this->addSql('ALTER TABLE carrito ADD CONSTRAINT FK_77E6BED5DE734E51 FOREIGN KEY (cliente_id) REFERENCES cliente (id) NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('ALTER TABLE carrito ADD CONSTRAINT FK_77E6BED57645698E FOREIGN KEY (producto_id) REFERENCES producto (id) NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('ALTER TABLE carrito ADD CONSTRAINT FK_77E6BED540B83CFE FOREIGN KEY (merchandising_id) REFERENCES merchandising (id) NOT DEFERRABLE INITIALLY IMMEDIATE');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE SCHEMA public');
        $this->addSql('DROP SEQUENCE carrito_id_seq CASCADE');
        $this->addSql('ALTER TABLE carrito DROP CONSTRAINT FK_77E6BED5DE734E51');
        $this->addSql('ALTER TABLE carrito DROP CONSTRAINT FK_77E6BED57645698E');
        $this->addSql('ALTER TABLE carrito DROP CONSTRAINT FK_77E6BED540B83CFE');
        $this->addSql('DROP TABLE carrito');
    }
}
