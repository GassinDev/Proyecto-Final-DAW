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

    #[ORM\Column(length: 255)]
    private ?string $clienteUsername = null;

    #[ORM\ManyToOne]
    private ?Tatuaje $tatuaje = null;

    #[ORM\Column(length: 255)]
    private ?string $workerName = null;

    #[ORM\Column]
    private ?bool $realized = null;

    #[ORM\Column(length: 400)]
    private ?string $description = null;

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

    public function getClienteUsername(): ?string
    {
        return $this->clienteUsername;
    }

    public function setClienteUsername(string $clienteUsername): static
    {
        $this->clienteUsername = $clienteUsername;

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

    public function getWorkerName(): ?string
    {
        return $this->workerName;
    }

    public function setWorkerName(string $workerName): static
    {
        $this->workerName = $workerName;

        return $this;
    }

    public function isRealized(): ?bool
    {
        return $this->realized;
    }

    public function setRealized(bool $realized): static
    {
        $this->realized = $realized;

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
}
