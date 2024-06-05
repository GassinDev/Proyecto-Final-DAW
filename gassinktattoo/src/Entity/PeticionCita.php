<?php

namespace App\Entity;

use App\Repository\PeticionCitaRepository;
use Doctrine\DBAL\Types\Types;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: PeticionCitaRepository::class)]
class PeticionCita
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\Column(type: Types::DATETIME_MUTABLE)]
    private ?\DateTimeInterface $fechaHoraCita = null;

    #[ORM\ManyToOne]
    private ?Cliente $cliente = null;

    #[ORM\ManyToOne]
    #[ORM\JoinColumn(nullable: false)]
    private ?Tatuaje $tatuaje = null;

    #[ORM\Column(length: 500)]
    private ?string $description = null;

    #[ORM\Column]
    private ?bool $isAccepted = false;

    #[ORM\Column(length: 255)]
    private ?string $usernameWorker = null;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getFechaHoraCita(): ?\DateTimeInterface
    {
        return $this->fechaHoraCita;
    }

    public function setFechaHoraCita(\DateTimeInterface $fechaHoraCita): static
    {
        $this->fechaHoraCita = $fechaHoraCita;

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

    public function isAccepted(): ?bool
    {
        return $this->isAccepted;
    }

    public function setAccepted(bool $isAccepted): static
    {
        $this->isAccepted = $isAccepted;

        return $this;
    }

    public function getUsernameWorker(): ?string
    {
        return $this->usernameWorker;
    }

    public function setUsernameWorker(string $usernameWorker): static
    {
        $this->usernameWorker = $usernameWorker;

        return $this;
    }
}
