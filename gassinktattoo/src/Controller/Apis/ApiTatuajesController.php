<?php

namespace App\Controller\Apis;

use App\Repository\FavoritoRepository;
use App\Repository\TatuajeRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Bundle\SecurityBundle\Security;
use Symfony\Component\HttpFoundation\JsonResponse;
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
                'style' => $tatuaje->getStyle(),
                'price' => $tatuaje->getPrice(),
                'image' => $tatuaje->getImage(),
                'favorito' => $esFavorito,
            ];
        }

        return $this->json($tatuajesConFavoritos);
    }

    #[Route('/api/tatuajes/estilos', name: 'tatuajes_estilos')]
    public function getMerchandisingTipos(TatuajeRepository $tatuajeRepository): JsonResponse
    {

        $tatuajes = $tatuajeRepository->findAll();

        $estilosArray = [];
        foreach ($tatuajes as $estilos) {

            $estilo = $estilos->getStyle(); 

            if (!in_array($estilo, $estilosArray)) {
                $estilosArray[] = $estilo;
            }
        }

        return new JsonResponse($estilosArray);
    }

    #[Route(path: '/api/tatuajesName', name: 'tatuajesName')]
public function getTatuajesName(TatuajeRepository $tatuajeRepository): JsonResponse
{
    $tatuajes = $tatuajeRepository->findAll();

    $nameTatuajes = [];
    foreach ($tatuajes as $tatuaje) {  
        $nameTatuajes[] = $tatuaje->getName(); 
    }

    return new JsonResponse(['namesTatuajes' => $nameTatuajes]);
}
}
