<?php

namespace App\Entity;

use App\Repository\CitaRepository;
use Doctrine\DBAL\Types\Types;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: CitaRepository::class)]
class Cita
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\Column(type: Types::DATETIME_MUTABLE)]
    private ?\DateTimeInterface $dateInicio = null;

    #[ORM\Column(type: Types::DATETIME_MUTABLE)]
    private ?\DateTimeInterface $dateFin = null;

    #[ORM\ManyToOne]
    private ?Tatuaje $tatuaje = null;


    #[ORM\Column(length: 400)]
    private ?string $description = null;

    #[ORM\ManyToOne]
    #[ORM\JoinColumn(nullable: false)]
    private ?Cliente $cliente = null;

    #[ORM\ManyToOne]
    #[ORM\JoinColumn(nullable: false)]
    private ?Cliente $worker = null;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getDateInicio(): ?\DateTimeInterface
    {
        return $this->dateInicio;
    }

    public function setDateInicio(\DateTimeInterface $dateInicio): static
    {
        $this->dateInicio = $dateInicio;

        return $this;
    }

    public function getDateFin(): ?\DateTimeInterface
    {
        return $this->dateFin;
    }

    public function setDateFin(\DateTimeInterface $dateFin): static
    {
        $this->dateFin = $dateFin;

        return $this;
    }

    public function getTatuaje(): ?Tatuaje
    {
        return $this->tatuaje;
    }

    public function setTatuaje(?Tatuaje $tatuaje): static
    {
        $this->tatuaje = $tatuaje;

        return $this;
    }


    public function getDescription(): ?string
    {
        return $this->description;
    }

    public function setDescription(string $description): static
    {
        $this->description = $description;

        return $this;
    }

    public function getCliente(): ?Cliente
    {
        return $this->cliente;
    }

    public function setCliente(?Cliente $cliente): static
    {
        $this->cliente = $cliente;

        return $this;
    }

    public function getWorker(): ?Cliente
    {
        return $this->worker;
    }

    public function setWorker(?Cliente $worker): static
    {
        $this->worker = $worker;

        return $this;
    }
}
