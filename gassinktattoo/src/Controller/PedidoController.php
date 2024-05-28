<?php

namespace App\Controller;

use App\Entity\Cliente;
use App\Entity\Pedido;
use App\Repository\ClienteRepository;
use App\Repository\PedidoRepository;
use DateTime;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Bundle\SecurityBundle\Security;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;

class PedidoController extends AbstractController
{
    #[Route('/pedido/realizar', name: 'pedido_realizar')]
    public function realizarPedido(): Response
    {
        return $this->render('pages/realizarPedido.html.twig');
    }

    #[Route('/pedido/guardar', name: 'pedido_guardar')]
    public function guardarPedido(Request $request, Security $security, ClienteRepository $clienteRepository, PedidoRepository $pedidoRepository): Response
    {
        //RECIBIMOS LOS DATOS
        $data = json_decode($request->getContent(), true);

        // OBTENER EL CLIENTE AUTENTICADO Y LUEGO SU ID
        $cliente = $security->getUser();

        // COMPROBAMOS QUE $CLIENTE ES UNA INSTANCIA DE CLIENTE
        if ($cliente instanceof Cliente) {
            $clienteId = $cliente->getId();
        } else {
            return new Response('Cliente no autenticado.', Response::HTTP_UNAUTHORIZED);
        }

        // BUSCAMOS LAS ENTIDADES EN LA BASE DE DATOS
        $cliente = $clienteRepository->find($clienteId);

        //CREAMOS UNA INSTANCIA DE PEDIDO
        $pedido = new Pedido();
        $pedido->setNombreCompleto($data['nombre']);
        $pedido->setPhone($data['telefono']);
        $pedido->setCalle($data['calle']);
        $pedido->setCiudad($data['ciudad']);
        $pedido->setProvincia($data['provincia']);
        $pedido->setCp($data['cp']);
        $pedido->setPais($data['pais']);
        $pedido->setNumero($data['numero']);
        $pedido->setPrice($data['precio']);
        $pedido->setOrderDate(new DateTime());
        $pedido->setStatus('Pendiente');
        $pedido->setCliente($cliente);

        $pedidoRepository->save($pedido);

        return new Response('Pedido guardado correctamente', Response::HTTP_OK);
    }
}
