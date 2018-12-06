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
import com.ent3.servlet.service.CompetencyRepository;
import com.ent3.servlet.service.CourseRepository;
import com.ent3.servlet.service.QuestionRepository;
import com.ent3.servlet.service.UserRepository;

/**
 * Repository DB implementation
 *
 * @author Peter Dimitrov
 */
public class RepoImplementation implements UserRepository, CompetencyRepository, AreaRepository, CourseRepository, QuestionRepository {
    private static RepoImplementation instance;

    private EntityManagerFactory entityManagerFactory;

    static {
        instance = new RepoImplementation();
    }

    private RepoImplementation() {
        entityManagerFactory = Persistence.createEntityManagerFactory("ent3PU");
    }

    /**
     * Creates a new entity manager.
     */
    private EntityManager getEntityManager() {
        return entityManagerFactory.createEntityManager();
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
    public Course addCourse(Competency competency, Course course) {
        EntityManager em = getEntityManager();

        competency.addCourse(course);

        em.getTransaction().begin();
        em.persist(course);
        em.getTransaction().commit();

        em.close();

        return course;
    }

    @Override
    public List<Competency> getAllAreaCompetencies(int id) {
        EntityManager em = getEntityManager();

        Area area = em.find(Area.class, id);
        List<Competency> result = null;

        if (area != null) {
            result = area.getCompetencies();
        }

        em.close();

        return result;
    }

    @Override
    public Competency getCompetencyById(int id) {
        EntityManager em = getEntityManager();

        Competency result = em.find(Competency.class, id);

        em.close();

        return result;
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
    public List<Question> getAllCompetencyQuestions(int id) {
        EntityManager em = getEntityManager();

        Competency competency = em.find(Competency.class, id);
        List<Question> result = null;

        if (competency != null) {
            result = competency.getQuestions();
        }

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
    public Question addQuestion(Competency competency, Question question) {
        EntityManager em = getEntityManager();

        competency.addQuestion(question);

        em.getTransaction().begin();
        em.persist(question);
        em.getTransaction().commit();

        em.close();

        return question;
    }
}