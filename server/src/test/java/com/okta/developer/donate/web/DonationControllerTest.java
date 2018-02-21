package com.okta.developer.donate.web;

import com.okta.developer.donate.DonateApplication;
import com.okta.developer.donate.domain.MoneyDonation;
import com.okta.developer.donate.domain.MoneyDonationRepository;
import com.okta.developer.donate.domain.TimeDonation;
import com.okta.developer.donate.domain.TimeDonationRepository;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.web.context.WebApplicationContext;

import javax.persistence.EntityManager;
import javax.transaction.Transactional;
import java.net.MalformedURLException;
import java.net.URL;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@RunWith(SpringRunner.class)
@SpringBootTest(classes = DonateApplication.class)
public class DonationControllerTest {

    public static final String DEFAULT_NAME = "Matt Raible";
    public static final int DEFAULT_HOURS = 40;
    public static final String DEFAULT_EMAIL = "matt.raible@okta.com";
    public static final double DEFAULT_AMOUNT = 100.00;
    public static final String DEFAULT_PROJECT_NAME = "JHipster";
    public static final String DEFAULT_PROJECT_URL = "http://www.jhipster.tech";
    @Autowired
    private MoneyDonationRepository moneyRepository;

    @Autowired
    private TimeDonationRepository timeRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private WebApplicationContext context;

    private MockMvc restWeightMockMvc;

    private MoneyDonation money;

    private TimeDonation time;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        DonationController controller = new DonationController(timeRepository, moneyRepository);
        this.restWeightMockMvc = MockMvcBuilders.standaloneSetup(controller).build();
    }

    public static MoneyDonation createMoneyDonation(EntityManager em) {
        MoneyDonation donation = new MoneyDonation();
        donation.setName(DEFAULT_NAME);
        donation.setEmail(DEFAULT_EMAIL);
        donation.setAmount(DEFAULT_AMOUNT);
        return donation;
    }

    public static TimeDonation createTimeDonation(EntityManager em) throws MalformedURLException {
        TimeDonation donation = new TimeDonation();
        donation.setName(DEFAULT_NAME);
        donation.setEmail(DEFAULT_EMAIL);
        donation.setHours(DEFAULT_HOURS);
        donation.setProjectName(DEFAULT_PROJECT_NAME);
        donation.setProjectUrl(new URL(DEFAULT_PROJECT_URL));
        return donation;
    }

    @Before
    public void initTest() throws Exception {
        timeRepository.deleteAll();
        moneyRepository.deleteAll();
        money = createMoneyDonation(em);
        time = createTimeDonation(em);
    }

    @Test
    @Transactional
    public void createTimeDonation() throws Exception {
        int databaseSizeBeforeCreate = timeRepository.findAll().size();

        // Create the donation
        restWeightMockMvc.perform(post("/api/donate-time")
                .contentType(TestUtil.APPLICATION_JSON_UTF8)
                .content(TestUtil.convertObjectToJsonBytes(time)))
                .andExpect(status().isCreated());

        // Validate the donation in the database
        List<TimeDonation> timeDonations = timeRepository.findAll();
        assertThat(timeDonations).hasSize(databaseSizeBeforeCreate + 1);
        TimeDonation testDonation = timeDonations.get(timeDonations.size() - 1);
        assertThat(testDonation.getHours()).isEqualTo(DEFAULT_HOURS);
        assertThat(testDonation.getName()).isEqualTo(DEFAULT_NAME);
    }

    @Test
    @Transactional
    public void createMoneyDonation() throws Exception {
        int databaseSizeBeforeCreate = moneyRepository.findAll().size();

        // Create the donation
        restWeightMockMvc.perform(post("/api/donate-money")
                .contentType(TestUtil.APPLICATION_JSON_UTF8)
                .content(TestUtil.convertObjectToJsonBytes(money)))
                .andExpect(status().isCreated());

        // Validate the donation in the database
        List<MoneyDonation> MoneyDonations = moneyRepository.findAll();
        assertThat(MoneyDonations).hasSize(databaseSizeBeforeCreate + 1);
        MoneyDonation testDonation = MoneyDonations.get(MoneyDonations.size() - 1);
        assertThat(testDonation.getAmount()).isEqualTo(DEFAULT_AMOUNT);
        assertThat(testDonation.getName()).isEqualTo(DEFAULT_NAME);
    }

    @Test
    @Transactional
    public void getCoolStats() throws Exception {
        DonationController controller = new DonationController(timeRepository, moneyRepository);
        this.restWeightMockMvc = MockMvcBuilders.standaloneSetup(controller).build();

        // Create the donations
        restWeightMockMvc.perform(post("/api/donate-money")
                .contentType(TestUtil.APPLICATION_JSON_UTF8)
                .content(TestUtil.convertObjectToJsonBytes(money)))
                .andExpect(status().isCreated());
        restWeightMockMvc.perform(post("/api/donate-time")
                .contentType(TestUtil.APPLICATION_JSON_UTF8)
                .content(TestUtil.convertObjectToJsonBytes(time)))
                .andExpect(status().isCreated());

        // Get stats
        restWeightMockMvc.perform(get("/api/cool-stats"))
                .andDo(print())
                .andExpect(status().isOk())
                .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
                .andExpect(jsonPath("$.time").value(DEFAULT_HOURS))
                .andExpect(jsonPath("$.money").value(DEFAULT_AMOUNT));
    }

}

