<?php

namespace App\Repository;

use App\Entity\Favorito;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @extends ServiceEntityRepository<Favorito>
 */
class FavoritoRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, Favorito::class);
    }

    public function save(Favorito $favorito): void
    {
        $entityManager = $this->getEntityManager();
        $entityManager->persist($favorito);
        $entityManager->flush();
    }

    public function remove(Favorito $favorito): void
    {
        $entityManager = $this->getEntityManager();
        $entityManager->remove($favorito);
        $entityManager->flush();
    }

    //    /**
    //     * @return Favorito[] Returns an array of Favorito objects
    //     */
    //    public function findByExampleField($value): array
    //    {
    //        return $this->createQueryBuilder('f')
    //            ->andWhere('f.exampleField = :val')
    //            ->setParameter('val', $value)
    //            ->orderBy('f.id', 'ASC')
    //            ->setMaxResults(10)
    //            ->getQuery()
    //            ->getResult()
    //        ;
    //    }

    //    public function findOneBySomeField($value): ?Favorito
    //    {
    //        return $this->createQueryBuilder('f')
    //            ->andWhere('f.exampleField = :val')
    //            ->setParameter('val', $value)
    //            ->getQuery()
    //            ->getOneOrNullResult()
    //        ;
    //    }
}
