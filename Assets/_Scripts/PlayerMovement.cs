using System;
using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class PlayerMovement : MonoBehaviour
{
    public float speed = 6.0f;
    public float jumpSpeed = 8.0f;
    public float gravity = -9.8f;
    public float jumpHeight = 3f;
    
    public Transform groundCheck;
    public float groundDistance = .4f;
    public LayerMask groundMask;
    public Vector2 direction;

    private Vector3 velocity;
    private CharacterController controller;
    public Rigidbody rigidbody;
    private bool isGrounded;

    // Start is called before the first frame update
    void Start()
    {
        controller = GetComponent<CharacterController>();
    }

    // Update is called once per frame
    void Update()
    {
        isGrounded = Physics.CheckSphere(groundCheck.position, groundDistance, groundMask);

        /*if(isGrounded && velocity.y < 0)
        {
            velocity.y = -2f;
        }*/
    
        float horizontal = JoystickController.ins.Horizontal();
        float vertical = JoystickController.ins.Vertical();
        /*float horizontal = Input.GetAxis("Horizontal");
        float vertical = Input.GetAxis("Vertical");*/
        Vector3 moveDirection = transform.right * horizontal + transform.forward * vertical;

        controller.Move(moveDirection * speed * Time.deltaTime);
        //rigidbody.AddForce(moveDirection * speed * Time.deltaTime);
        if(Input.GetButtonDown("Jump") && isGrounded)
        {
            velocity.y = Mathf.Sqrt(jumpHeight * -2 * gravity);
        }

        velocity.y += gravity * Time.deltaTime;
        
        controller.Move(velocity * Time.deltaTime);
    }
}
