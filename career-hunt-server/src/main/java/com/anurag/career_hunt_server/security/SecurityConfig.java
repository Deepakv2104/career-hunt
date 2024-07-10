package com.anurag.career_hunt_server.security;

import com.anurag.career_hunt_server.services.MyUserDetailsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

    @Autowired
    private JwtAuthenticationEntryPoint jwtAuthenticationEntryPoint;

    @Autowired
    private JwtRequestFilter jwtRequestFilter;

    @Autowired
    private MyUserDetailsService jwtUserDetailsService;

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public DaoAuthenticationProvider authenticationProvider() {
        DaoAuthenticationProvider authProvider = new DaoAuthenticationProvider();
        authProvider.setUserDetailsService(jwtUserDetailsService);
        authProvider.setPasswordEncoder(passwordEncoder());
        return authProvider;
    }

    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration authConfig) throws Exception {
        return authConfig.getAuthenticationManager();
    }

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
            .cors().and()
            .csrf(csrf -> csrf.disable())
            .authorizeHttpRequests(authz -> authz
                .requestMatchers("/authenticate", "/register").permitAll()
                .requestMatchers(HttpMethod.POST,"/employer/createProfile").hasAnyAuthority("EMPLOYER")
                .requestMatchers(HttpMethod.GET,"/employer/getProfile").hasAnyAuthority("EMPLOYER")
                .requestMatchers(HttpMethod.PUT,"/employer/updateProfile").hasAnyAuthority("EMPLOYER")
                .requestMatchers(HttpMethod.DELETE,"/employer/deleteProfile").hasAnyAuthority("EMPLOYER")
                .requestMatchers(HttpMethod.POST,"/employer/jobs/postJob").hasAnyAuthority("EMPLOYER")
                .requestMatchers(HttpMethod.GET,"/employer/jobs/getJobs").hasAnyAuthority("EMPLOYER")
                .requestMatchers(HttpMethod.PUT,"/employer/jobs/updateJob/{jobId}").hasAnyAuthority("EMPLOYER")
                .requestMatchers(HttpMethod.DELETE,"/employer/jobs/deleteJob/{jobId}").hasAnyAuthority("EMPLOYER")
                .requestMatchers(HttpMethod.POST,"/userProfile/createProfile").hasAnyAuthority("USER")
                .requestMatchers(HttpMethod.GET,"/userProfile/getProfile").hasAnyAuthority("USER")
                .requestMatchers(HttpMethod.PUT,"/userProfile/updateProfile").hasAnyAuthority("USER")
                .requestMatchers(HttpMethod.DELETE,"/userProfile/deleteProfile").hasAnyAuthority("USER")
                .requestMatchers(HttpMethod.GET,"/userProfile/resume").hasAnyAuthority("USER")
                .requestMatchers(HttpMethod.GET,"/userProfile/allJobs").hasAnyAuthority("USER")
                .requestMatchers(HttpMethod.POST,"/applications/apply/{jobId}").hasAnyAuthority("USER")
                .requestMatchers(HttpMethod.GET,"/applications/job/{jobId}").hasAnyAuthority("EMPLOYER")
                .requestMatchers(HttpMethod.GET,"/applications/allApplications").hasAnyAuthority("EMPLOYER")
                .requestMatchers(HttpMethod.GET,"/applications/myApplications").hasAnyAuthority("USER")
                .requestMatchers(HttpMethod.PUT,"/applications/updateStatus/{applicationId}/{status}").hasAnyAuthority("EMPLOYER")
                .requestMatchers(HttpMethod.GET,"/admin/allUsers").hasAnyAuthority("ADMIN")
                .requestMatchers(HttpMethod.GET,"/admin/allUserProfiles").hasAnyAuthority("ADMIN")
                .requestMatchers(HttpMethod.GET,"/admin/allEmployers").hasAnyAuthority("ADMIN")
                .requestMatchers(HttpMethod.GET,"/admin/allJobs").hasAnyAuthority("ADMIN")
                .requestMatchers(HttpMethod.GET,"/admin/allJobApplications").hasAnyAuthority("ADMIN")
                .requestMatchers(HttpMethod.GET,"/admin/allFeedbacks").hasAnyAuthority("ADMIN")
                .requestMatchers(HttpMethod.POST,"/feedback/post").hasAnyAuthority("USER","EMPLOYER")
                .requestMatchers(HttpMethod.GET,"/resume/viewResume/{resumeFilePath}").hasAnyAuthority("USER","EMPLOYER")
                .anyRequest().authenticated()
            )
            .exceptionHandling(exceptionHandling ->
                exceptionHandling.authenticationEntryPoint(jwtAuthenticationEntryPoint)
            )
            .sessionManagement(sessionManagement ->
                sessionManagement.sessionCreationPolicy(SessionCreationPolicy.STATELESS)
            );

        http.authenticationProvider(authenticationProvider());
        http.addFilterBefore(jwtRequestFilter, UsernamePasswordAuthenticationFilter.class);

        return http.build();
    }
}
