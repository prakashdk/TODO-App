package com.example.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(maxAge = 18880)
@RestController
public class Handler {

    @Autowired
    private UserRepository repository;

    @RequestMapping("/")
    public String home(){
        return "<h1>Welcome</h1>";
    }

    @RequestMapping(value="/add") // Map ONLY POST Requests
    public @ResponseBody
    String addNewUser (@RequestParam(name = "id") String id,@RequestParam(name = "name") String name, @RequestParam(name = "email") String email) {
        // @ResponseBody means the returned String is the response, not a view name
        // @RequestParam means it is a parameter from the GET or POST request

        Company n = new Company();
        n.setId(Integer.valueOf(id));
        n.setName(name);
        n.setEmail(email);
        repository.save(n);
        return "Saved";
    }
    @RequestMapping(value="/delete") // Map ONLY POST Requests
    public @ResponseBody
    String addNewUser (@RequestParam(name = "id") String id) {
        // @ResponseBody means the returned String is the response, not a view name
        // @RequestParam means it is a parameter from the GET or POST request
        repository.deleteById(Integer.valueOf(id));
        return "Deleted";
    }

    @GetMapping(path="/all")
    public @ResponseBody Iterable<Company> getAllCompany() {
        // This returns a JSON or XML with the users
        return repository.findAll();
    }
}
