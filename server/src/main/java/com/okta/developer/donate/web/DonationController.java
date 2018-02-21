package com.okta.developer.donate.web;

import com.okta.developer.donate.domain.*;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.net.URI;
import java.net.URISyntaxException;
import java.util.Optional;

@RestController
@RequestMapping("/api")
public class DonationController {
    private final Logger log = LoggerFactory.getLogger(DonationController.class);
    private static final String ENTITY_NAME = "donation";

    private TimeDonationRepository timeRepository;
    private MoneyDonationRepository moneyRepository;

    public DonationController(TimeDonationRepository timeRepository, MoneyDonationRepository moneyRepository) {
        this.timeRepository = timeRepository;
        this.moneyRepository = moneyRepository;
    }

    /**
     * POST  /donate-money : Create a new money donation.
     *
     * @param donation the donation to create
     * @return the ResponseEntity with status 201 (Created) and with body the new donation, or with status 400 (Bad Request) if the donation has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/donate-money")
    public ResponseEntity<MoneyDonation> donateMoney(@Valid @RequestBody MoneyDonation donation) throws URISyntaxException {
        log.debug("REST request to save Money Donation: {}", donation);
        if (donation.getId() != null) {
            return ResponseEntity.badRequest().headers(HeaderUtil.createFailureAlert(
                    ENTITY_NAME, "idexists", "A new donation cannot already have an ID")).body(null);
        }

        MoneyDonation result = moneyRepository.save(donation);
        return ResponseEntity.created(new URI("/api/donations/money/" + result.getId()))
                .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
                .body(result);
    }

    /**
     * POST  /donate-time : Create a new time donation.
     *
     * @param donation the donation to create
     * @return the ResponseEntity with status 201 (Created) and with body the new donation, or with status 400 (Bad Request) if the donation has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/donate-time")
    public ResponseEntity<TimeDonation> donateMoney(@Valid @RequestBody TimeDonation donation) throws URISyntaxException {
        log.debug("REST request to save Time Donation: {}", donation);
        if (donation.getId() != null) {
            return ResponseEntity.badRequest().headers(HeaderUtil.createFailureAlert(
                    ENTITY_NAME, "idexists", "A new donation cannot already have an ID")).body(null);
        }

        TimeDonation result = timeRepository.save(donation);
        return ResponseEntity.created(new URI("/api/donations/time/" + result.getId()))
                .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
                .body(result);
    }

    @GetMapping("/cool-stats")
    public DonationStats coolStats() {
        Double money = moneyRepository.findAll().stream()
                .filter(d -> d.getAmount() != null)
                .mapToDouble(MoneyDonation::getAmount).sum();
        Long time = timeRepository.findAll().stream()
                .filter(d -> d.getHours() != null)
                .mapToLong(TimeDonation::getHours).sum();
        return new DonationStats(time, money);
    }

    /**
     * GET  /money-donations/:id : get the money donation with "id".
     *
     * @return the ResponseEntity with status 200 (OK) and with body the points, or with status 404 (Not Found)
     */
    @GetMapping("/donations/money/{id}")
    public ResponseEntity<MoneyDonation> getMoneyDonation(@PathVariable Long id) {
        log.debug("REST request to get money donation: {}", id);
        MoneyDonation donation = moneyRepository.findById(id).get();
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(donation));
    }

    /**
     * GET  /time-donations/:id : get the time donation with "id".
     *
     * @return the ResponseEntity with status 200 (OK) and with body the points, or with status 404 (Not Found)
     */
    @GetMapping("/donations/time/{id}")
    public ResponseEntity<TimeDonation> getTimeDonation(@PathVariable Long id) {
        log.debug("REST request to get time donation: {}", id);
        TimeDonation donation = timeRepository.findById(id).get();
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(donation));
    }
}
