package com.okta.developer.donate.domain;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface MoneyDonationRepository extends JpaRepository<MoneyDonation, Long> {
}
