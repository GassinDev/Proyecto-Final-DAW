<?php

namespace App\Entity;

use App\Repository\PedidoArticulosRepository;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: PedidoArticulosRepository::class)]
class PedidoArticulos
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\ManyToOne(inversedBy: 'pedidoArticulos')]
    #[ORM\JoinColumn(nullable: false)]
    private ?Pedido $pedido = null;

    #[ORM\ManyToOne]
    private ?Producto $product = null;

    #[ORM\ManyToOne]
    private ?Merchandising $merchandising = null;

    #[ORM\Column]
    private ?int $quantity = null;

    #[ORM\Column(length: 255, nullable: true)]
    private ?string $size = null;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getPedido(): ?Pedido
    {
        return $this->pedido;
    }

    public function setPedido(?Pedido $pedido): static
    {
        $this->pedido = $pedido;

        return $this;
    }

    public function getProduct(): ?Producto
    {
        return $this->product;
    }

    public function setProduct(?Producto $product): static
    {
        $this->product = $product;

        return $this;
    }

    public function getMerchandising(): ?Merchandising
    {
        return $this->merchandising;
    }

    public function setMerchandising(?Merchandising $merchandising): static
    {
        $this->merchandising = $merchandising;

        return $this;
    }

    public function getQuantity(): ?int
    {
        return $this->quantity;
    }

    public function setQuantity(int $quantity): static
    {
        $this->quantity = $quantity;

        return $this;
    }

    public function getSize(): ?string
    {
        return $this->size;
    }

    public function setSize(?string $size): static
    {
        $this->size = $size;

        return $this;
    }
}
