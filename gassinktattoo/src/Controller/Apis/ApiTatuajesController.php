<?php

namespace App\Controller\Apis;

use App\Repository\FavoritoRepository;
use App\Repository\TatuajeRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Bundle\SecurityBundle\Security;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;

class ApiTatuajesController extends AbstractController
{
    #[Route('/api/tatuajes', name: 'api_tatuajes')]
    public function getTatuajes(TatuajeRepository $tatuajeRepository, Security $security, FavoritoRepository $favoritoRepository): Response
    {
        $cliente = $security->getUser();

        $tatuajes = $tatuajeRepository->findAll();

        $tatuajesConFavoritos = [];

        // Recorrer los tatuajes
        foreach ($tatuajes as $tatuaje) {

            $favorito = $favoritoRepository->findOneBy(['cliente' => $cliente, 'tatuaje' => $tatuaje]);
            $esFavorito = $favorito !== null;

            // Agregar información sobre el favorito al tatuaje
            $tatuajesConFavoritos[] = [
                'id' => $tatuaje->getId(),
                'name' => $tatuaje->getName(),
                'price' => $tatuaje->getPrice(),
                'image' => $tatuaje->getImage(),
                'favorito' => $esFavorito,
            ];
        }

        return $this->json($tatuajesConFavoritos);
    }
}
