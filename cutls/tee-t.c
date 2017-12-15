#include <stdio.h>
#include <unistd.h>
#include <fcntl.h>
#include <malloc.h>

int main(int argc, char* argv[])
{
    int append;
    int c;
    int numfiles;
    int* fds;

    append = 0;
    while((c = getopt(argc, argv, "a")) != -1)
    {
        switch(c)
        {
            case 'a':
            append = 1;
            break;
        }
    }
    
    numfiles = (argc - optind) + 1;

    if (numfiles)
    {
        fds = malloc(numfiles * sizeof (FILE*));
    }
    
    fds[0] = STDOUT_FILENO;
    for (int i = 1; i < numfiles; i++)
    {
        fds[i] = open(argv[optind + i - 1],  O_CREAT | O_WRONLY | (append ? O_APPEND : O_TRUNC), S_IRUSR | S_IWUSR);
    }

    int num_read;
    int num_wrote;
    char buf[1024];

    while ((num_read = read(STDIN_FILENO, buf, sizeof(buf))) > 0)
    {
        for (int i = 0; i < numfiles; i++)
        {
            num_wrote = write(fds[i], buf, num_read);
            if (num_wrote != num_read)
            {
                break;
            }
        }
    }

    for (int i = 1; i < numfiles + 1; i++)
    {
        close(fds[i]);
    }
    return 0;
}
