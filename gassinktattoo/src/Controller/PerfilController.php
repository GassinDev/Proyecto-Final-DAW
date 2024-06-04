<?php

namespace App\Controller;

use App\Entity\Cliente;
use App\Entity\Favorito;
use App\Repository\FavoritoRepository;
use App\Repository\TatuajeRepository;
use Proxies\__CG__\App\Entity\Tatuaje;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Bundle\SecurityBundle\Security;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;

class PerfilController extends AbstractController
{
    #[Route(path: '/perfilDatos', name: 'perfilDatos')]
    public function perfilDatos(Security $security): Response
    {
        // Obtener el cliente autenticado
        $cliente = $security->getUser();

        // Comprobar que $cliente es una instancia de Cliente
        if ($cliente instanceof Cliente) {
            // Obtener todos los datos del cliente
            $datosCliente = [
                'username' => $cliente->getUsername(),
                'email' => $cliente->getEmail(),
                'image' => $cliente->getImagePerfil()
            ];
        }

        return $this->json($datosCliente);
    }

    #[Route(path: '/addFavorito/{idTatuaje}', name: 'addFavorito')]
    public function addFavorito(int $idTatuaje, Security $security, FavoritoRepository $favoritoRepository, TatuajeRepository $tatuajeRepository): Response
    {
        $cliente = $security->getUser();

        $tatuaje = $tatuajeRepository->find($idTatuaje);

        $favorito = new Favorito();
        $favorito->setCliente($cliente);
        $favorito->setTatuaje($tatuaje);

        $favoritoRepository->save($favorito);

        return $this->json(['success' => 'Agregado a favoritos'], Response::HTTP_CREATED);
    }

    #[Route(path: '/tatooFavoritos', name: 'tatooFavoritos')]
    public function tatooFavoritos(Security $security, FavoritoRepository $favoritoRepository): Response
    {
        $cliente = $security->getUser();
        $favoritos = $favoritoRepository->findBy(['cliente' => $cliente]);

        $tattosFavoritos = [];
        foreach ($favoritos as $favorito) {
            $tattosFavoritos[] = [
                'nombreTatuaje' => $favorito->getTatuaje()->getName(),
                'imageTatuaje' => $favorito->getTatuaje()->getImage()
            ];
        }

        return $this->json($tattosFavoritos);
    }

    #[Route(path: '/removeFavorito/{idTatuaje}', name: 'removeFavorito')]
    public function removeFavorito(Security $security, FavoritoRepository $favoritoRepository, TatuajeRepository $tatuajeRepository, int $idTatuaje): Response
    {

        $cliente = $security->getUser();
        $tatuaje = $tatuajeRepository->find($idTatuaje);

        $favorito = $favoritoRepository->findOneBy(['cliente' => $cliente, 'tatuaje' => $tatuaje]);

        $favoritoRepository->remove($favorito);

        return $this->json(['success' => 'Borrado de favoritos'], Response::HTTP_CREATED);
    }
}
