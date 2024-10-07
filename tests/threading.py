import logging
import threading
import time


def thread_function(name):
    while True:
        logging.info("Thread %s: starting", name)
        time.sleep(2)

if __name__ == "__main__":
    format = "%(asctime)s: %(message)s"
    logging.basicConfig(format=format, level=logging.INFO, datefmt="%H:%M:%S")
    logging.info("Main    : before creating thread")
    x = threading.Thread(target=thread_function, args=(1,), daemon=False)
    logging.info("Main    : before running thread")
    x.start()
    logging.info("Main    : wait for the thread to finish")
    x.join()
    logging.info("Main    : all done")


class DomainOperations:

    def __init__(self):
        self.domain_ip = ''
        self.website_thumbnail = ''

    def resolve_domain(self):
        self.domain_ip = 'foo'

    def generate_website_thumbnail(self):
        self.website_thumbnail= 'bar'

    def run(self):
        t1 = threading.Thread(target=self.resolve_domain)
        t2 = threading.Thread(target=self.generate_website_thumbnail)
        t1.start()
        t2.start()
        t1.join()
        t2.join()
        print(self.domain_ip, self.website_thumbnail)

if __name__ == '__main__':
    d = DomainOperations()
    d.run()