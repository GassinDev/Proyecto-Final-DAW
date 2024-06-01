<?php

namespace App\Entity;

use App\Repository\ClienteRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Bridge\Doctrine\Validator\Constraints\UniqueEntity;
use Symfony\Component\Security\Core\User\PasswordAuthenticatedUserInterface;
use Symfony\Component\Security\Core\User\UserInterface;

#[ORM\Entity(repositoryClass: ClienteRepository::class)]
#[ORM\UniqueConstraint(name: 'UNIQ_IDENTIFIER_EMAIL', fields: ['email'])]
#[UniqueEntity(fields: ['email'], message: 'There is already an account with this email')]
class Cliente implements UserInterface, PasswordAuthenticatedUserInterface
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\Column(length: 180)]
    private ?string $email = null;

    /**
     * @var list<string> The user roles
     */
    #[ORM\Column]
    private array $roles = [];

    /**
     * @var string The hashed password
     */
    #[ORM\Column]
    private ?string $password = null;

    #[ORM\Column]
    private bool $isVerified = false;

    /**
     * @var Collection<int, Carrito>
     */
    #[ORM\OneToMany(targetEntity: Carrito::class, mappedBy: 'cliente', orphanRemoval: true)]
    private Collection $carritos;

    /**
     * @var Collection<int, Pedido>
     */
    #[ORM\OneToMany(targetEntity: Pedido::class, mappedBy: 'cliente')]
    private Collection $pedidos;

    #[ORM\Column(length: 255, nullable: true)]
    private ?string $imagePerfil = null;

    #[ORM\Column(length: 255)]
    private ?string $username = null;

    #[ORM\Column]
    private ?bool $isWorker = false;

    public function __construct()
    {
        $this->carritos = new ArrayCollection();
        $this->pedidos = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getEmail(): ?string
    {
        return $this->email;
    }

    public function setEmail(string $email): static
    {
        $this->email = $email;

        return $this;
    }

    /**
     * A visual identifier that represents this user.
     *
     * @see UserInterface
     */
    public function getUserIdentifier(): string
    {
        return (string) $this->email;
    }

    /**
     * @see UserInterface
     *
     * @return list<string>
     */
    public function getRoles(): array
    {
        $roles = $this->roles;
        // guarantee every user at least has ROLE_USER
        $roles[] = 'ROLE_USER';

        return array_unique($roles);
    }

    /**
     * @param list<string> $roles
     */
    public function setRoles(array $roles): static
    {
        $this->roles = $roles;

        return $this;
    }

    /**
     * @see PasswordAuthenticatedUserInterface
     */
    public function getPassword(): string
    {
        return $this->password;
    }

    public function setPassword(string $password): static
    {
        $this->password = $password;

        return $this;
    }

    /**
     * @see UserInterface
     */
    public function eraseCredentials(): void
    {
        // If you store any temporary, sensitive data on the user, clear it here
        // $this->plainPassword = null;
    }

    public function isVerified(): bool
    {
        return $this->isVerified;
    }

    public function setVerified(bool $isVerified): static
    {
        $this->isVerified = $isVerified;

        return $this;
    }

    /**
     * @return Collection<int, Carrito>
     */
    public function getCarritos(): Collection
    {
        return $this->carritos;
    }

    public function addCarrito(Carrito $carrito): static
    {
        if (!$this->carritos->contains($carrito)) {
            $this->carritos->add($carrito);
            $carrito->setCliente($this);
        }

        return $this;
    }

    public function removeCarrito(Carrito $carrito): static
    {
        if ($this->carritos->removeElement($carrito)) {
            // set the owning side to null (unless already changed)
            if ($carrito->getCliente() === $this) {
                $carrito->setCliente(null);
            }
        }

        return $this;
    }

    /**
     * @return Collection<int, Pedido>
     */
    public function getPedidos(): Collection
    {
        return $this->pedidos;
    }

    public function addPedido(Pedido $pedido): static
    {
        if (!$this->pedidos->contains($pedido)) {
            $this->pedidos->add($pedido);
            $pedido->setCliente($this);
        }

        return $this;
    }

    public function removePedido(Pedido $pedido): static
    {
        if ($this->pedidos->removeElement($pedido)) {
            // set the owning side to null (unless already changed)
            if ($pedido->getCliente() === $this) {
                $pedido->setCliente(null);
            }
        }

        return $this;
    }

    public function getImagePerfil(): ?string
    {
        return $this->imagePerfil;
    }

    public function setImagePerfil(?string $imagePerfil): static
    {
        $this->imagePerfil = $imagePerfil;

        return $this;
    }

    public function getUsername(): ?string
    {
        return $this->username;
    }

    public function setUsername(string $username): static
    {
        $this->username = $username;

        return $this;
    }

    public function isWorker(): ?bool
    {
        return $this->isWorker;
    }

    public function setIsWorker(bool $isWorker): static
    {
        $this->isWorker = $isWorker;

        return $this;
    }
}
