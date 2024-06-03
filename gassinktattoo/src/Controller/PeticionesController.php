<?php

namespace App\Controller;

use App\Entity\PeticionCita;
use App\Repository\ClienteRepository;
use App\Repository\PeticionCitaRepository;
use App\Repository\TatuajeRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Bundle\SecurityBundle\Security;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;

class PeticionesController extends AbstractController
{
    #[Route('/realizarPeticion', name: 'realizarPeticion', methods: ['POST'])]
    public function realizarPeticion(Request $request, ClienteRepository $clienteRepository, TatuajeRepository $tatuajeRepository, PeticionCitaRepository $peticionCitaRepository): Response
    {
        $data = json_decode($request->getContent(), true);

        $cliente = $this->getUser();

        $worker = $clienteRepository->findOneBy(['username' => $data['workerName']]);
        $tatuaje = $tatuajeRepository->find($data['tatuajeId']);


        if (!$worker || !$tatuaje) {
            return $this->json(['error' => 'Invalid worker or tatuaje'], Response::HTTP_BAD_REQUEST);
        }

        $peticion = new PeticionCita();
        $peticion->setCliente($cliente);
        $peticion->setUsernameWorker($worker->getUsername());
        $peticion->setTatuaje($tatuaje);
        $peticion->setDescription($data['descripcion']);
        $peticion->setFechaHoraCita(new \DateTime($data['fechaHora']));

        $peticionCitaRepository->save($peticion);

        return $this->json(['success' => 'Peticion creada con éxito'], Response::HTTP_CREATED);
    }

    #[Route('/mostrarPeticiones', name: 'mostrarPeticiones')]
    public function mostrarPeticiones(PeticionCitaRepository $peticionCitaRepository, Security $security): Response
    {
        $user = $security->getUser();

        $peticiones = $peticionCitaRepository->findBy(['cliente' => $user]);

        $datosPeticiones = [];

        foreach ($peticiones as $peticion) {
            $datosPeticiones[] = [
                'id' => $peticion->getId(),
                'nameTattoo' => $peticion->getTatuaje()->getName(),
                'fecha' => $peticion->getFechaHoraCita()->format('Y-m-d H:i'),
                'nameWorker' => $peticion->getUsernameWorker(),
                'description' => $peticion->getDescription()
            ];
        }

        return new JsonResponse($datosPeticiones);
    }
}
