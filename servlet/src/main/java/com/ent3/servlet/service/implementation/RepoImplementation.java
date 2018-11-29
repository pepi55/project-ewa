package com.ent3.servlet.service.implementation;

import java.util.List;

import javax.persistence.EntityManager;
import javax.persistence.EntityManagerFactory;
import javax.persistence.Persistence;
import javax.persistence.Query;

import com.ent3.servlet.model.Area;
import com.ent3.servlet.model.Competency;
import com.ent3.servlet.model.Course;
import com.ent3.servlet.model.Question;
import com.ent3.servlet.model.User;
import com.ent3.servlet.service.AreaRepository;
import com.ent3.servlet.service.CourseRepository;
import com.ent3.servlet.service.QuestionRepository;
import com.ent3.servlet.service.UserRepository;

/**
 * Repository DB implementation
 *
 * @author Peter Dimitrov
 */
public class RepoImplementation implements UserRepository, AreaRepository, CourseRepository, QuestionRepository {
    private static RepoImplementation instance;

    private EntityManagerFactory entityManagerFactory;

    static {
        instance = new RepoImplementation();
    }

    private RepoImplementation() {
        entityManagerFactory = Persistence.createEntityManagerFactory("ent3PU");
    }

    public static RepoImplementation getInstance() {
        return instance;
    }

    @Override
    @SuppressWarnings("unchecked")
    public List<User> getAllUsers() {
        EntityManager em = getEntityManager();

        List<User> result = em.createQuery("SELECT u FROM User u").getResultList();

        em.close();

        return result;
    }

    @Override
    public User getUserById(int id) {
        EntityManager em = getEntityManager();

        User result = em.find(User.class, id);

        em.close();

        return result;
    }

    @Override
    @SuppressWarnings("unchecked")
    public List<User> getUsersByFirstName(String firstname) {
        EntityManager em = getEntityManager();

        Query query = em.createQuery("SELECT u FROM User u WHERE u.firstname = :firstname");
        query.setParameter("firstname", firstname);
        List<User> result = query.getResultList();

        em.close();

        return result;
    }

    @Override
    @SuppressWarnings("unchecked")
    public List<User> getUsersByLastName(String lastname) {
        EntityManager em = getEntityManager();

        Query query = em.createQuery("SELECT u FROM User u WHERE u.lastname = :lastname");
        query.setParameter("lastname", lastname);
        List<User> result = query.getResultList();

        em.close();

        return result;
    }

    @Override
    public User addUser(User user) {
        EntityManager em = getEntityManager();

        em.getTransaction().begin();
        em.persist(user);
        em.getTransaction().commit();

        em.close();

        return user;
    }

    @Override
    @SuppressWarnings("unchecked")
    public List<Area> getAllAreas() {
        EntityManager em = getEntityManager();

        List<Area> result = em.createQuery("SELECT a FROM Area a").getResultList();

        em.close();

        return result;
    }

    @Override
    public Area getAreaById(int id) {
        EntityManager em = getEntityManager();

        Area result = em.find(Area.class, id);

        em.close();

        return result;
    }

    @Override
    public Area addArea(Area area) {
        EntityManager em = getEntityManager();

        em.getTransaction().begin();
        em.persist(area);
        em.getTransaction().commit();

        em.close();

        return area;
    }

    @Override
    public Competency addCompetency(Area area, Competency competency) {
        EntityManager em = getEntityManager();

        area.addCompetency(competency);

        em.getTransaction().begin();
        em.persist(competency);
        em.getTransaction().commit();

        em.close();

        return competency;
    }

    @Override
    @SuppressWarnings("unchecked")
    public List<Course> getAllCourses() {
        EntityManager em = getEntityManager();

        List<Course> result = em.createQuery("SELECT c FROM Course c").getResultList();

        em.close();

        return result;
    }

    @Override
    public Course getCourseById(int id) {
        EntityManager em = getEntityManager();

        Course result = em.find(Course.class, id);

        em.close();

        return result;
    }

    @Override
    public Course addCourse(Course course) {
        EntityManager em = getEntityManager();

        em.getTransaction().begin();
        em.persist(course);
        em.getTransaction().commit();

        em.close();

        return course;
    }

    /**
     * Creates a new entity manager.
     */
    private EntityManager getEntityManager() {
        return entityManagerFactory.createEntityManager();
    }

    @Override
    @SuppressWarnings("unchecked")
    public List<Question> getAllQuestions() {
        EntityManager em = getEntityManager();

        List<Question> result = em.createQuery("SELECT u FROM Question u").getResultList();

        em.close();

        return result;
    }

    @Override
    public Question getQuestionById(int id) {
        EntityManager em = getEntityManager();

        Question result = em.find(Question.class, id);

        em.close();

        return result;
    }

    @Override
    public Question addQuestion(Question Question) {
        EntityManager em = getEntityManager();

        em.getTransaction().begin();
        em.persist(Question);
        em.getTransaction().commit();

        em.close();

        return Question;
    }

    @Override
    @SuppressWarnings("unchecked")
    public List<Question> getQuestionsByCompetency(Competency competency) {
        EntityManager em = getEntityManager();

        List<Question> result = em.createQuery("SELECT u FROM Question u").getResultList();
        // TODO: nog filteren op competency
        em.close();

        return result;
	}

    @Override
    public Question setScoreById(int id, int score) {
        return null;
    }
}